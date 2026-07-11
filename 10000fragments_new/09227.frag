uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.23 * pow(abs(cos(ra * 7.0 + t * 0.81)), 0.64);
    v = sin((rr - pet) * 18.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.38 / 3.1415927, 0.75 / r + time * 2.76);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.54, 0.73, 0.99) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.01, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
