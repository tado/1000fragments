uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.37;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.60) * kp; kp *= 1.31; }
    v = sin(kp.x * 2.52 - t * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.66 / 3.1415927, 0.88 / r + time * 1.69);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.12, vec3(0.44, 0.59, 0.57), vec3(0.39, 0.34, 0.50), vec3(1.12, 1.21, 0.84), vec3(0.03, 0.80, 0.17));
	col *= clamp(r * 1.61, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
