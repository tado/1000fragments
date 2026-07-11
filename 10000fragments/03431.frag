uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.48) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.83) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.25, vec3(0.53, 0.59, 0.49), vec3(0.41, 0.37, 0.46), vec3(0.89, 1.00, 0.96), vec3(0.22, 0.92, 0.83));
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
