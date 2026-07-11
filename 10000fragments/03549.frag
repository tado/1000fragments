uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.90) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.45 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -2.75 + time * 0.62) * p;
	p *= 3.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.07, vec3(0.59, 0.46, 0.45), vec3(0.44, 0.38, 0.40), vec3(0.97, 1.27, 1.13), vec3(0.63, 0.96, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
