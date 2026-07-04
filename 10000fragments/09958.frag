uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.95;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.46)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.09 - t * 7.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 19.2) + 0.5) / 19.2;
	p = sin(p * 2.88 + time * 1.93) * 1.14;
	p = abs(p);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.40; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.11, 0.11), vec3(0.64, 0.72, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
