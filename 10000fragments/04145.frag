uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.65 + t * 3.42 + ph) * 0.7;
    float wb = sin(p.y * 14.67 - t * 3.67 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.89 / 3.1415927, 0.92 / r - time * 0.90);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.31, 0.42, 0.75) * (0.24 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.77, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
