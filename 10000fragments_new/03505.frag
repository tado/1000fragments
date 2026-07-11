uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 4.34 * sin(t * 1.04) + t * 5.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 0.83)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.78;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 0.40 / r + time * 1.22);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.03);
	col *= clamp(r * 1.63, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
