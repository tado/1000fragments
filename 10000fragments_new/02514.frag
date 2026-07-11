uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.21 * cos(sa * 7.0 + t * 1.04 + ph);
    v = sin((sr - petal) * 16.95);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.65), cos(time * 1.13)) * 0.23;
	float an = atan(p.y, p.x) + time * -0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.59 / r - time * 2.68);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.20);
	col *= clamp(r * 1.40, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
