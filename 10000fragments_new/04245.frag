uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.01;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.41; kp = rot2(2.57) * kp; kp *= 1.22; }
    v = sin(kp.x * 1.97 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 0.57 / r - time * 0.69);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.24, 0.54), vec3(0.85, 0.91, 0.87), cc);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
