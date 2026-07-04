uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.98);
    float gsh = hash21(vec2(grow, floor(t * 3.09))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 12.54 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.52));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 1.41 / r + time * 1.19);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.58 + time * 0.78);
	col *= clamp(r * 2.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
