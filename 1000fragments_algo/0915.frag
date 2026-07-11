uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.81;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.20)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.27 - t * 2.01 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.54) * 0.91), cos((time * 0.54) * 0.81)) * 0.24;
	p += vec2(sin((time * 0.54) * 0.57), cos((time * 0.54) * 1.14)) * 0.05;
	float an = atan(p.y, p.x) + (time * 0.54) * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.21 / 3.1415927, 0.84 / r + (time * 0.54) * 0.70);
	float d = field(tv, (time * 0.54), 0.0);
	vec3 col = vec3(0.52, 0.59, 0.55) * (0.10 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.27, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.54)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.942, 1.025) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
