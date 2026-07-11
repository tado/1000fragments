uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 6.65 * sin(t * 0.96) + t * 2.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.55) * 0.81), cos((time * 0.55) * 0.57)) * 0.09;
	float an = atan(p.y, p.x) + (time * 0.55) * -0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.66 / 3.1415927, 0.72 / r + (time * 0.55) * 1.56);
	float d = field(tv, (time * 0.55), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.77, 0.69, 0.66) + vec3(0.04, 0.04, 0.05);
	col *= clamp(r * 1.44, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.55)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 1.000, 0.923) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
