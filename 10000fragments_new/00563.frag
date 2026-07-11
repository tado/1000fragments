uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.30 * pow(abs(cos(ra * 6.0 + t * 1.67)), 1.02);
    v = sin((rr - pet) * 15.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.53), cos(time * 1.09)) * 0.24;
	float an = atan(p.y, p.x) + time * 0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.70 / 3.1415927, 1.28 / r - time * 1.05);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.70, 0.24, 0.62) * (0.09 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.17, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
