uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.59);
    float gsh = hash21(vec2(grow, floor(t * 5.74))) - 0.5;
    float gx = p.x + gsh * 1.09;
    v = sin(gx * 16.88 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.68));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.67)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.87 / 3.1415927, 0.99 / r + time * 2.90);
	tv.x += tv.y * 0.20;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.53, 0.82, 0.51) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.22, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
