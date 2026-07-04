uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 6.07 * sin(t * 1.09) + t * 4.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 1.11 / r + time * 2.63);
	tv.x += tv.y * 0.20;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.98 + time * 0.98);
	col *= clamp(r * 1.97, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
