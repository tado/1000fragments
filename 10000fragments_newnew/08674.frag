uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.21 + sin(p.y * 3.78 + t * 4.15) * 4.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 0.90)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.02 / 3.1415927, 0.97 / r - time * 0.62);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.04);
	col *= clamp(r * 1.59, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
