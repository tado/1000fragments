uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.91;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.69)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.90 - t * 6.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	p *= 1.0 + 0.30 * sin((time * 0.64) * 2.21);
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.64) * 1.90));
	p.x += sin(p.y * 4.84 + (time * 0.64) * 2.70) * 0.19;
	float d = field(p, (time * 0.64), 0.0);
	vec3 col = palette(d * 0.49 + (time * 0.64) * 0.16, vec3(0.50, 0.51, 0.53), vec3(0.17, 0.11, 0.18), vec3(0.87, 0.69, 0.55), vec3(0.02, 0.59, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.992, 0.938) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
