uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.36;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.69; kp = rot2(2.53) * kp; kp *= 1.22; }
    v = sin(kp.y * 2.58 - t * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.60 / 3.1415927, 1.30 / r + time * 2.42);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.13, vec3(0.44, 0.43, 0.42), vec3(0.31, 0.33, 0.43), vec3(1.05, 1.19, 1.20), vec3(0.12, 0.30, 0.89));
	col *= clamp(r * 2.92, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
