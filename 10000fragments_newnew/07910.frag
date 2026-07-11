uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.54);
    float gsh = hash21(vec2(grow, floor(t * 9.28))) - 0.5;
    float gx = p.x + gsh * 0.90;
    v = sin(gx * 19.23 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.50));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.81 / 3.1415927, 1.07 / r + time * 0.67);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.45, 0.41, 0.88) * (0.16 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.28, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.27 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
