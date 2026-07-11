uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.17 * cos(sa * 5.0 + t * 1.58 + ph);
    v = sin((sr - petal) * 17.86);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.77;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.29 / 3.1415927, 0.95 / r + time * 1.38);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.02 + time * 0.27);
	col *= clamp(r * 2.49, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
