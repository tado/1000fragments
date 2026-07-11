uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.20) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.92 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	p += vec2(-0.09, 0.11) * sin(length(p) * 2.53 - time * 1.16) * 0.35;
	p = rot2(p.y * -3.96 + time * 0.41) * p;
	p = (floor(p * 18.9) + 0.5) / 18.9;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.22, vec3(0.49, 0.54, 0.46), vec3(0.46, 0.42, 0.31), vec3(1.09, 0.94, 1.17), vec3(0.73, 0.44, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
