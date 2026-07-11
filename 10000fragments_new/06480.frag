uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.11 * cos(sa * 7.0 + t * 0.76 + ph);
    v = sin((sr - petal) * 14.58);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 4.00 / 3.1415927, 1.41 / r + time * 0.69);
	tv.x += tv.y * 0.47;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.24 + time * 0.26);
	col *= clamp(r * 1.15, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
