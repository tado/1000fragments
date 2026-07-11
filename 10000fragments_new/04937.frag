uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.00 + t * 1.58 + ph) * 0.7;
    float wb = sin(p.y * 4.86 - t * 2.36 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 1.14 / r - time * 0.81);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.46 + time * 0.08);
	col *= clamp(r * 2.37, 0.0, 1.0);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
