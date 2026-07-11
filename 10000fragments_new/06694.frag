uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.91);
    float gsh = hash21(vec2(grow, floor(t * 9.42))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 7.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.97));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.46 / 3.1415927, 0.43 / r + time * 1.52);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.45, 0.69, 0.31) * (0.09 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.78, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
