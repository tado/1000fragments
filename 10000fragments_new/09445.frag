uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.33 * sin(t * 1.45) + t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.99 / 3.1415927, 0.43 / r - time * 0.67);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.99, 0.90, 0.83) * (0.05 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.40, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
