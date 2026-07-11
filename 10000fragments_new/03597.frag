uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.22 * pow(abs(cos(ra * 5.0 + t * 1.37)), 1.40);
    v = sin((rr - pet) * 10.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.49), cos(time * 0.71)) * 0.30;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.01 / 3.1415927, 0.71 / r + time * 1.59);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.92 + time * 0.07);
	col *= clamp(r * 1.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
