uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.41;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(1.81) * kp; kp *= 1.33; }
    v = sin(kp.y * 3.74 - t * 2.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.89), cos(time * 0.47)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.53 / 3.1415927, 1.09 / r + time * 1.12);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.22 + time * 0.69);
	col *= clamp(r * 1.89, 0.0, 1.0);
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
