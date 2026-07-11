uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.10;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.78; kp = rot2(1.09) * kp; kp *= 1.39; }
    v = sin(kp.y * 3.70 - t * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.58 / 3.1415927, 0.61 / r - time * 0.83);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.65, 0.42, 0.96) * (0.23 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
