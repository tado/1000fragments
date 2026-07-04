uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.03 + t * 0.79 + ph) * 0.7;
    float wb = sin(p.y * 10.10 - t * 2.60 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.49;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.51), cos(time * 0.87)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.80;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 1.34 / r + time * 1.69);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.02 + time * 0.07);
	col *= clamp(r * 1.37, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
