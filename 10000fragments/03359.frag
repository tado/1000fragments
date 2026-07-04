uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.01 + sr * 17.12 - t * 3.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.28), cos(time * 0.41)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 0.76 / r + time * 2.83);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.67 + time * 0.13);
	col *= clamp(r * 1.63, 0.0, 1.0);
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
