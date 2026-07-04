uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.39;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.47; kp = rot2(1.06) * kp; kp *= 1.30; }
    v = sin(kp.y * 3.45 - t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.14 / 3.1415927, 1.50 / r + time * 3.00);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.76, 0.91, 0.67) * (0.09 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.42, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
