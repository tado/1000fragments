uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.32 + vec2(t * 1.98, -t * 2.05) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.25), cos(time * 1.29)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.79 / 3.1415927, 0.76 / r + time * 1.16);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.39, 0.62, 0.53) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.05, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
