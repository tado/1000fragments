uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.27 * cos(sa * 5.0 + t * 1.68 + ph);
    v = sin((sr - petal) * 17.50);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.59 / 3.1415927, 1.00 / r - time * 0.74);
	tv.x += tv.y * 0.47;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.23, vec3(0.42, 0.53, 0.58), vec3(0.48, 0.44, 0.37), vec3(1.38, 0.83, 1.30), vec3(0.27, 0.54, 0.72));
	col *= clamp(r * 1.97, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
