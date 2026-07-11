uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.36;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.81)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.04 - t * 3.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p += vec2(-0.61, 0.45) * sin(length(p) * 2.53 - time * 0.87) * 0.17;
	p = (floor(p * 27.6) + 0.5) / 27.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.11, vec3(0.55, 0.53, 0.59), vec3(0.34, 0.44, 0.41), vec3(1.19, 1.18, 1.05), vec3(0.09, 0.34, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
