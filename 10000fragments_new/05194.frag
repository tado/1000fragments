uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.93;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.21) * kp; kp *= 1.15; }
    v = sin(kp.x * 2.18 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 1.31)) * 0.23;
	float an = atan(p.y, p.x) + time * -0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.15 / 3.1415927, 1.25 / r + time * 1.92);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.76, 0.84, 0.52) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.60, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
