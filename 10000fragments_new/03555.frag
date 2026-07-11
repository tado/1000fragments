uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.13 * cos(sa * 6.0 + t * 0.69 + ph);
    v = sin((sr - petal) * 16.29);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.06 / 3.1415927, 0.46 / r - time * 0.65);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.62 + time * 0.22);
	col *= clamp(r * 2.33, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
