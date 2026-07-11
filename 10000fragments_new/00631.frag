uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 6.39 * sin(t * 0.65) + t * 4.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 1.17)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.98 / 3.1415927, 0.44 / r - time * 0.98);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.44 + time * 0.25);
	col *= clamp(r * 1.43, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
