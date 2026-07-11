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
    v = sin(qa * 10.0 + qr * 5.02 * sin(t * 1.21) + t * 2.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.89 / 3.1415927, 1.24 / r - time * 2.03);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.41 + time * 0.11);
	col *= clamp(r * 1.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
