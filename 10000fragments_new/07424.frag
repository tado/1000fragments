uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.04 + t * 0.82 + ph) * 0.7;
    float wb = sin(p.y * 7.21 - t * 3.77 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.59;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 0.52)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.95 / 3.1415927, 1.05 / r + time * 2.18);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.01 + time * 0.07);
	col *= clamp(r * 2.50, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
