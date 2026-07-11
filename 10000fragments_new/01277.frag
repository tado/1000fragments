uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.60;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.53; kp = rot2(0.66) * kp; kp *= 1.44; }
    v = sin(kp.y * 2.58 - t * 1.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.68 / 3.1415927, 1.27 / r + time * 1.04);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.23, 0.56, 0.38) * (0.14 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.19, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
