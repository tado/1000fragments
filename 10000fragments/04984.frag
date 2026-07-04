uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.37;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.69; kp = rot2(1.55) * kp; kp *= 1.31; }
    v = sin(kp.y * 1.95 - t * 4.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.96 / 3.1415927, 0.59 / r + time * 1.04);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.10, vec3(0.43, 0.45, 0.60), vec3(0.41, 0.32, 0.43), vec3(0.70, 1.14, 1.11), vec3(0.61, 0.17, 0.93));
	col *= clamp(r * 2.10, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
