uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 5.38 * sin(t * 0.62) + t * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.79 / 3.1415927, 0.32 / r + time * 1.44);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.89, 0.53, 1.01) + vec3(0.03, 0.19, 0.04);
	col *= clamp(r * 1.03, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
