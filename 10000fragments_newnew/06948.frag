uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.40;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.57; kp = rot2(0.87) * kp; kp *= 1.27; }
    v = sin(kp.y * 3.14 - t * 2.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.76 / 3.1415927, 0.45 / r - time * 0.53);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.70 + time * 0.37);
	col *= clamp(r * 1.26, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
