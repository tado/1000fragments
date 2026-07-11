uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.91) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.32 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p += vec2(-0.02, -0.20) * sin(length(p) * 3.91 - time * 0.97) * 0.20;
	p = rot2(length(p) * 2.67 + time * 0.71) * p;
	p *= 2.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.15, vec3(0.48, 0.56, 0.56), vec3(0.41, 0.34, 0.47), vec3(0.83, 0.98, 0.78), vec3(0.95, 0.25, 0.60));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
