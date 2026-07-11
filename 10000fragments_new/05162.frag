uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.57);
    float gsh = hash21(vec2(grow, floor(t * 3.49))) - 0.5;
    float gx = p.x + gsh * 0.59;
    v = sin(gx * 15.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.07));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.40 / 3.1415927, 1.44 / r - time * 2.84);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.12, vec3(0.46, 0.40, 0.43), vec3(0.48, 0.49, 0.44), vec3(1.39, 1.06, 1.06), vec3(0.28, 0.90, 0.38));
	col *= clamp(r * 1.40, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
