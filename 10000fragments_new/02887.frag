uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.86;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.72; kp = rot2(0.57) * kp; kp *= 1.37; }
    v = sin(kp.y * 2.91 - t * 4.54 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 0.51)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.85 / r - time * 1.53);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.30);
	col *= clamp(r * 2.07, 0.0, 1.0);
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
