uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.63);
    float gsh = hash21(vec2(grow, floor(t * 3.18))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 17.03 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.08));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.03), cos(time * 1.31)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 0.31 / r - time * 1.73);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.56, 0.75, 0.69) * (0.18 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.61, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
