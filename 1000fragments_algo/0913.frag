uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.85);
    float gsh = hash21(vec2(grow, floor(t * 4.09))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 9.46 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.38));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.75) * 1.41), cos((time * 0.75) * 0.43)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.47 / 3.1415927, 0.72 / r - (time * 0.75) * 2.92);
	float d = field(tv, (time * 0.75), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.65, 0.60, 0.74) + vec3(0.09, 0.06, 0.10);
	col *= clamp(r * 1.19, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.999, 0.940) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
