uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.19 * pow(abs(cos(ra * 2.0 + t * 1.62)), 2.25);
    v = sin((rr - pet) * 8.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.24 / 3.1415927, 1.40 / r - time * 1.36);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.04);
	col *= clamp(r * 2.99, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
