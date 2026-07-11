uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 2.38 * sin(t * 1.37) + t * 5.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.87 / 3.1415927, 0.49 / r + time * 2.83);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.68, 0.43, 0.43) * (0.09 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.43, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
