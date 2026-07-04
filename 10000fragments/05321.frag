uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.52;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 3.00)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.76 - t * 2.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	p = sin(p * 1.63 + time * 0.84) * 0.86;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 2.95 - time * 0.92); }
	p = fract(p * 1.81) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.10, vec3(0.56, 0.48, 0.46), vec3(0.38, 0.30, 0.34), vec3(0.93, 1.38, 0.73), vec3(0.56, 0.61, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
