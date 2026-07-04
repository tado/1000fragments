uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.60 + t * 2.69 + ph) * 0.7;
    float wb = sin(p.y * 18.81 - t * 2.38 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.80 / 3.1415927, 0.65 / r + time * 2.88);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.00 + time * 0.98);
	col *= clamp(r * 1.43, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
