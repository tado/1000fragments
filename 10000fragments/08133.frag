uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 27.17 - t * 2.21 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 10.88 - t * 4.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 1.00 / r - time * 0.81);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.99 + time * 0.57);
	col *= clamp(r * 2.40, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
