uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.42;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.66; kp = rot2(2.48) * kp; kp *= 1.19; }
    v = sin(kp.y * 3.86 - t * 4.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.33 / 3.1415927, 0.95 / r - time * 1.50);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.40 + time * 0.65);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
